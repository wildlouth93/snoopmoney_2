# SnoopMoney

[Live Link](https://snoopmoney.herokuapp.com/#/)

Welcome to SnoopMoney, a single-page clone of Robinhood. This app uses Rails and PostgreSQL on the backend, and uses React and Rails on the frontend. Combining these libraries with an external Stock API, users can see in real-time the performance of stocks the user currently owns or watches.  

This project was designed and built in under two weeks. 

![](https://user-images.githubusercontent.com/29221213/69450047-dc571d80-0d21-11ea-9b9f-e9e1e535d92b.png)

## Features
* User Authentication using BCrypt
* Dashboard 
* Stock Page 
* Account Page 

### Dashboard
* In the dashboard, users can view their portfolio performance. Additionally, users can see news related to companies in the users watchlist. 
* In the dashboard, users have access to a scrollable box which contains the user's stock that they currently own or are watching. 
* From the box, users can click the individual stock section which takes the user to stock's show page.
* **Highlighted Feature: Scrollable Stock and Watchlist Box:** 

![](https://user-images.githubusercontent.com/29221213/69449270-263f0400-0d20-11ea-86d1-8f9340a67dbf.png)

### Stock Page

* The stock show page shows the stock's current price. It also shows a graph which shows the stock's performance for the selected time period. 
* On the stock show page, the about section tells about the company's key statistics.  
* **Highlighted Feature: Interactive Stock Graph:** 

![](https://user-images.githubusercontent.com/29221213/69449274-29d28b00-0d20-11ea-9e70-9ff4edb3135f.png)

### Account Page 
* On the account page, a user can see a more detailed view of the stocks owned by the user. 
* This page combines information collected from the Stock API and the backend holdings table to give users a real-time snapshot of their stocks performance. 
* **Highlighted Feature: Account Table:**

![](https://user-images.githubusercontent.com/29221213/69450956-e712b200-0d23-11ea-8974-01755f065f67.png)

## Highlights 
1. **Stock API.** The stock information is powered by an external API, IEX Cloud Console. This API feeds stock information to the front-end in real time. With this feature, the app can access all the relevant stock information needed to power the stock page. By integrating the app with the stock API, the app may be scaled to allow the user to interact with any stock the API may access. [IEX Cloud Console](https://iexcloud.io/)

2. **Graphs.** The stock graph used in the stock page integrates a library called Recharts. The stock graph takes data passed in from the API and creates interactive graphs. The portfolio graph is worth noting. This graph requires taking in the data from the API and manipulating it into a combined data structure so that the user can see the overall performance of the portfolio.

![](https://user-images.githubusercontent.com/29221213/73210391-ce51be80-410f-11ea-9fb0-140584748ebd.png)

![](https://user-images.githubusercontent.com/29221213/69453158-ef212080-0d28-11ea-8f28-3b800f8a7bd2.png)

![](https://user-images.githubusercontent.com/29221213/69449277-2b03b800-0d20-11ea-997e-fbf334106ed6.png)



3. **Stocks and WatchList Box.** This box allows users to move from the dashboard to individual stock pages, while also providing a snippet about the stock's performance. 


![](https://user-images.githubusercontent.com/29221213/69449273-2808c780-0d20-11ea-88be-6c0b08498ecc.png)

#### Notes

**Name.** Check out this article if you're curious why the app is named [SnoopMoney.](https://money.cnn.com/2014/09/23/investing/jared-leto-snoop-dogg-nas-robinhood-trading-app/index.html)
