![alt text](https://www.peter-nguyen.dev/detail/desktop/image-kanban-hero@2x.jpg)

### Deployment: https://fem-kanban.vercel.app/ ###

**NextJS / TailwindCSS / MongoDB / React-Query / React Beautiful DnD**

----

***Kanban*** is a full-stack productivity application that makes task management simple and enjoyable for individuals or teams. Translated in Japanese as 'billboard', Kanban is a digital visual platform allowing projects to be viewed and planned at every stage of development. The method was popularised by the Toyota Production System but has since found relevance in other industries including software development, marketing, HR and also for individuals.

The front-end stack is built with NextJS/TailwindCSS/Redux to allow responsive UI interaction and menu global state management. Atlassian's React Beautiful DnD package is incoporated into the board, allowing tasks to be drag-and-dropped within and across colums. The mobile experience incorporates horizontal snap scrolling to improve the board navigation experience.

For the back-end, a document-oriented NoSQL database is chosen where each board is represented as a separate document in a MongoDB cloud database. The CRUD operations are programmed as NextJS API routes and are queried/mutated using the React-Query library, allowing for advanced caching and refetching in real-time as data is updated.


![alt text](https://www.peter-nguyen.dev/detail/desktop/image-kanban-preview-1@2x.jpg)
![alt text](https://www.peter-nguyen.dev/detail/desktop/image-kanban-preview-2@2x.jpg)
