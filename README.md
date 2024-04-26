## -- Trackero v0.1 --


### Project Description
+ A financial expense tracker application developed @Codecool Advanced Java Spring module as a group capstone project. Users are able to register and log in to the application and track their income/expenses. Users are able to attach a category to each transaction record as well as personalise their category list. The application provides the user with various information and charts about their logged transactions.


### Techstack
```
Frontend
    + ReactJS (Vite template)          - javascript library and build tool.
    + React Router                     - client-side routing solution.
    + React Query                      - data fetching and server state manager solution.
    + ChartJS                          - chart library.
    + Fontawesome                      - icon library.
    + Axios                            - http client.
```

```
Backend
    + Java Spring Boot                 - java framework.
    + Spring Data JPA / Hibernate      - persistence application layer.
    + Spring Security                  - authentication and access-control layer.
    + Spring Mail                      - email sending library.
    + Project Lombok                   - annotation library.
    + JWT                              - token solution.
```

```
Database
    + PostgreSQL                       - relational database management system.
```

```
DevOps
    + Docker                           - containerisation solution.
```


### Running the application
+ A docker container is prepared with separate frontend and backend images to run the application in a local environment. 
    + Clone the repo.
    + Have the Docker application running in the local environment and run the ``docker-compose up --build`` command from the repo's root folder in a terminal panel.
    + Open ``http://localhost`` in a browser window.