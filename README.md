# Mission #12 Assignment
IS 413 – Hilton

Continue the Bookstore project from Mission #11.
Build in the ability for the user to filter by book categories (i.e. “Biography, “Self-Help”, etc.)
The page numbers should adjust based on the category selected.

Add the ability for the user to add books to their shopping cart.
The cart should update the quantity, price, subtotal, and total for each book that is added. 
The information should persist in the cart for the duration of the session as the user navigates around. 
Include the functionality for the user to “Continue Shopping” and go back to the page where they left off when they added the item to their cart.
Add a cart summary to the main book list page.

Arrange the website using the Bootstrap Grid.
In addition, do two things with Bootstrap that we have never done before in class.
**Bootstrap Comment**
1. Positioned badge (`position-absolute top-0 start-100 translate-middle badge rounded-pill`) — the red item-count bubble on the Cart button in the navbar, overlaid using Bootstrap's position utility stack
2. Input Group (`input-group input-group-sm`) — used in the Cart page to build a quantity spinner with flanking +/− buttons around a number input, creating a polished stepper control

Submit a pUbLiC link to the GitHub repository along with your comment about the Bootstrap attributes you added via Learning Suite.

**Terminal 1 — Backend**
```bash
cd backend/BookstoreApi
dotnet run --launch-profile http
```
API runs at `http://localhost:5203`

**Terminal 2 — Frontend**
```bash
cd frontend
npm install
npm run dev
```