# ShopSmart: Hyperlocal Smart Commerce Platform (Dark Store Model)

## 1. Project Title
**ShopSmart: Cloud-Native Hyperlocal Q-Commerce Platform**

## 2. Project Overview
ShopSmart addresses the growing consumer demand for "instant" delivery (under 15 minutes) by implementing a **Dark Store model**. Unlike traditional e-commerce where goods ship from distant centralized warehouses, ShopSmart decentralizes inventory into micro-warehouses (dark stores) located within dense urban pockets. The platform connects customers to the nearest physical stock point, enabling lightning-fast order fulfillment and solving the "last-mile" logistics inefficiency.

## 3. Why This Project Matters
*   **Business Relevance:** Positions the product in the high-growth **Quick Commerce (Q-Commerce)** sector, directly addressing latency in supply chains.
*   **Technical Complexity:** Showcases the ability to build **distributed systems**, manage **geo-spatial queries**, handle **high-concurrency inventory locking**, and orchestrate a containerized **cloud deployment**.
*   **Full Lifecycle Ownership:** Demonstrates end-to-end expertise from Database Design to Frontend UX and Cloud Infrastructure.

## 4. Target Users & Roles
1.  **Customer:**
    *   Browse products available in their specific delivery zone.
    *   Place orders and track delivery partners in real-time.
2.  **Store Manager (Dark Store):**
    *   Manage local inventory levels.
    *   View incoming orders and update status (Accepted -> Packed).
3.  **Delivery Partner:**
    *   Receive delivery tasks based on proximity.
    *   Navigation assistance and "Proof of Delivery" submission.
4.  **Super Admin:**
    *   Onboard new Dark Stores and define Geo-fences (service radius).
    *   View platform-wide analytics and revenue reports.

## 5. Core Features
### Customer Features
*   **Geo-Location Detection:** Auto-detects user location to show relevant catalog/pricing.
*   **Smart Search:** Fast product filtering and search.
*   **Secure Checkout:** Integrated Stripe/Razorpay payment gateway.
*   **Live Order Tracking:** Real-time updates on order milestones.

### Store Owner Features
*   **Live Order Dashboard:** Dynamic queue of incoming orders.
*   **Inventory Toggle:** Mark items out-of-stock instantly.
*   **Manifest Generation:** Print packing slips for fast fulfillment.

### Delivery Partner Features
*   **Task Acceptance:** Accept/Reject delivery requests.
*   **Route Optimization:** Integrated maps for fastest route to customer.
*   **Status Updates:** One-tap status updates (Picked Up, Delivered).

### Admin Features
*   **Store Management:** Create stores and draw polygon/radius geofences on maps.
*   **User Management:** Analytics on user growth and retention.
*   **Global Inventory View:** Monitor stock levels across all nodes.

## 6. Smart & Advanced Features
*   **Nearest Store Selection:** Utilizes **MongoDB Geospatial Queries (`$nearSphere`)** to automatically route orders to the closest dark store with stock.
*   **Real-time Inventory Locking:** Implements optimistic concurrency control (or Redis Mutex) to prevent overselling when 100 users try to buy the last Item X simultaneously.
*   **Intelligent Order Routing:** If the primary store is overloaded or OOS, smart logic routes the order to the secondary store if within an acceptable delivery radius.

## 7. Tech Stack
*   **Frontend:** **Next.js (React)** - Server Side Rendering (SSR) for SEO and performance; **Tailwind CSS** for responsive design.
*   **Backend:** **Node.js with Express** - RESTful API architecture.
*   **Database:** **MongoDB** - Flexible schema for products and powerful geospatial engine.
*   **Caching:** **Redis** - For caching frequently accessed product data and session management.
*   **Containerization:** **Docker** - Ensuring consistency across dev, test, and prod environments.
*   **Cloud Provider:** **AWS** - For scalable hosting and infrastructure.

## 8. AWS Services Used
*   **EC2 (Elastic Compute Cloud):** Hosts the Dockerized backend and frontend applications. *Reason: Provides full control over the compute environment and easy scaling.*
*   **S3 (Simple Storage Service):** Stores product images and user uploads. *Reason: Decouples static assets from the application server, offering infinite scalability and durability.*
*   **CloudFront:** Content Delivery Network (CDN) to serve non-dynamic content (images, JS bundles) from edge locations. *Reason: Drastically reduces latency for global users.*
*   **RDS or MongoDB Atlas:** Managed database solution. *Reason: Handles backups, patching, and scaling automatically.*
*   **SQS (Simple Queue Service):** Decouples order processing (e.g., sending confirmation emails) from the main request flow. *Reason: Improves system responsiveness and reliability.*

## 9. System Architecture Overview
The architecture is designed as a **Modular Monolith** (migratable to Microservices). Client requests are load-balanced and handled by the Next.js frontend or Node.js API. The API layer interacts with MongoDB for persistent storage and Redis for high-speed caching. Asynchronous tasks (like email notifications or analytics aggregation) are pushed to an AWS SQS queue and processed by background workers, ensuring the user interface remains non-blocking and responsive.

## 10. CI/CD & DevOps Workflow
1.  **Development:** Code is written locally and pushed to GitHub.
2.  **Continuous Integration (GitHub Actions):**
    *   Linting check.
    *   Unit tests execution.
    *   Docker Image build.
3.  **Artifact Management:** Docker images are tagged and pushed to **Docker Hub/ECR**.
4.  **Continuous Deployment:**
    *   GitHub Actions triggers an SSH command to the production AWS EC2 instance.
    *   Production server pulls the latest image and performs a rolling restart using Docker Compose.

## 11. Security Considerations
*   **JWT & HttpOnly-Cookies:** Stateless authentication mechanism secure against XSS.
*   **Input Validation:** Using `Joi` or `Zod` to validate all incoming requests, preventing injection attacks.
*   **Environment Variables:** Sensitive keys (DB URI, AWS Keys) managed via `.env` files and not committed to Git.
*   **HTTPS/SSL:** All traffic encrypted in transit (handled by Nginx/CloudFront).

## 12. Scalability & Future Enhancements
*   **Horizontal Scaling:** Deploying multiple instances of the backend behind a Load Balancer (AWS ALB) to handle increased traffic.
*   **Machine Learning Integration:** Predicting demand spikes for specific products in specific regions to automate "Dark Store Restocking".
*   **Microservices Transition:** Breaking apart the "Order Service" and "Inventory Service" as the team and complexity grow.

