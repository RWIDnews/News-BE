import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { PrismaService } from './prisma.service';
@Injectable()
export class ScrapingService {
  constructor(private readonly prisma: PrismaService) {}

//   @Cron('0 */4 * * *') // Schedule task to run every 4 hours
    @Cron('35 * * * *')
    async handleCron() {
        console.log('Running scraping task...');
        await this.runScraping();
        console.log('Scraping task completed.');
    }

    async runScraping() {
        try {
        const categoriesResponse = await axios.get('http://localhost:8000/categories');
        const categories = categoriesResponse.data;

        for (const [source, data] of Object.entries(categories)) {
            const categoryList = data['categories'];
            for (const category of categoryList) {
            const categoryName = Object.keys(category)[0];
            const links = category[categoryName];

            if (Array.isArray(links)) {
                for (const link of links) {
                await this.scrapeSource(source, categoryName, link);
                }
            } else if (links) {
                await this.scrapeSource(source, categoryName, links);
            }
            }
        }
        } catch (error) {
        console.error('Error fetching categories:', error);
        }
    }

    async scrapeSource(source: string, category: string, link: string) {
        try {
        const response = await axios.post('http://localhost:8000/scrape', {
            source,
            category,
            format: 'json',
        });
        let publisherId = 1

        switch (category.toLowerCase()) {
            case 'detik':
                publisherId = 1
                break;
            
            case 'kompas':
                publisherId = 2
                break;

            case 'tribun':
                publisherId = 3
                break;
        }

        if (response.status === 200) {
            const data = response.data.Data;
            

            for (const item of data) {
                const { Link, Title, Date: dateString, Author, 'Image URL': ImageUrl, Content } = item;
                const existingNews = await this.prisma.news.findUnique({
                    where: { links: Link },
                });

                const shortDesc = Content.length > 32 ? `${Content.substring(0, 32)}...` : Content;
                if (!existingNews) {
                    await this.prisma.news.create({
                    data: {
                        title: Title,
                        createdAt: new Date(),
                        author: Author,
                        imageUrl: ImageUrl,
                        shortDesc: shortDesc,
                        description: Content,
                        links: Link,
                        publishedAt: dateString,
                        publisherId: publisherId,
                        category: category,
                    },
                    });
                }
            }
        }
        } catch (error) {
        console.error(`Error scraping source ${source}, category ${category}:`, error);
        }
    }
}

