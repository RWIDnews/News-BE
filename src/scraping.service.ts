import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { PrismaService } from './prisma.service';
@Injectable()
export class ScrapingService {
  constructor(private readonly prisma: PrismaService) {}

//   @Cron('0 */4 * * *') // Schedule task to run every 4 hours
    @Cron('05 * * * *')
    async handleCron() {
        console.log('Running scraping task...');
        await this.runScraping();
        console.log('Scraping task completed.');
    }

    async runScraping() {
        try {
        const categories = {
            "detik": {
              "categories": [
                {
                  "top_news": "https://hot.detik.com/indeks/"
                },
                {
                  "sports": "https://sport.detik.com/indeks/"
                },
                {
                  "entertainment": "https://www.detik.com/pop/indeks/"
                },
                {
                  "health": "https://health.detik.com/indeks/"
                },
                {
                  "science_tech": "https://inet.detik.com/indeks/"
                },
                {
                  "news": "https://news.detik.com/indeks/"
                },
                {
                  "travel": "https://travel.detik.com/indeks/"
                }
              ]
            },
            "kompas": {
              "categories": [
                {
                  "top_news": "https://indeks.kompas.com/?site=tren"
                },
                {
                  "business": "https://indeks.kompas.com/?site=money"
                },
                {
                  "sports": "https://indeks.kompas.com/?site=bola"
                },
                {
                  "health": "https://indeks.kompas.com/?site=health"
                },
                {
                  "science_tech": "https://indeks.kompas.com/?site=sains"
                },
                {
                  "news": "https://indeks.kompas.com/?site=news"
                },
                {
                  "world_news": "https://indeks.kompas.com/?site=global"
                },
                {
                  "local_news": "https://indeks.kompas.com/?site=nasional"
                },
                {
                  "travel": "https://indeks.kompas.com/?site=food"
                }
              ]
            },
            "tribun": {
              "categories": [
                {
                  "politics": "https://www.tribunnews.com/mata-lokal-memilih"
                },
                {
                  "business": "https://www.tribunnews.com/bisnis"
                },
                {
                  "sports": "https://www.tribunnews.com/superskor"
                },
                {
                  "entertainment": "https://www.tribunnews.com/seleb"
                },
                {
                  "health": "https://www.tribunnews.com/kesehatan"
                },
                {
                  "news": "https://www.tribunnews.com/news"
                },
                {
                  "world_news": "https://www.tribunnews.com/internasional"
                },
                {
                  "local_news": "https://www.tribunnews.com/nasional"
                },
                {
                  "travel": "https://www.tribunnews.com/travel"
                }
              ]
            }
          }
          

        for (const [source, data] of Object.entries(categories)) {
            const categoryList = data['categories'];
            for (const category of categoryList) {
                const categoryName = Object.keys(category)[0];
                const links = category[categoryName];
                await this.scrapeSource(source, categoryName, links);
            }
        }
        } catch (error) {
        console.error('Error fetching categories:', error);
        }
    }

    async scrapeSource(source: string, category: string, link: string) {
        try {
            console.log(`Scraping ${source} - ${category} - ${link} ============`);
                
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
            let data = undefined
            console.log(response.status,Array.isArray(response.data) );
            
            if (response.status === 200) {
                if (Array.isArray(response.data)) {
                    let mergedData = [];
                
                    response.data.forEach((item) => {
                        if (Array.isArray(item.Data)) {
                            mergedData = mergedData.concat(item.Data);
                        }
                    });
                
                    data = response.data[0]
                    data['Data']= mergedData;
                    console.log(data);
                    
                } else {
                    data = response.data.Data;
                }
            }
            
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
                        shortDesc: shortDesc.replace(/[\/"]/g, ''),
                        description: Content.replace(/[\/"]/g, ''),
                        links: Link,
                        publishedAt: dateString,
                        publisherId: publisherId,
                        category: category,
                    },
                    });
                } else {
                    continue;
                }
            }

        } catch (error) {
        console.error(`Error scraping source ${source}, category ${category}:`, error);
        }
    }
}

