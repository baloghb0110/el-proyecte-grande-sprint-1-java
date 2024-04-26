# Stage 1 - build-stage
FROM eclipse-temurin:21-jdk-alpine AS build-stage

WORKDIR /backend
COPY mvnw pom.xml .
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline

COPY src src

RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# Stage 2 - prod-stage
FROM eclipse-temurin:21-jdk-alpine AS prod-stage

ARG DEPENDENCY=/backend/target/dependency
COPY --from=build-stage ${DEPENDENCY}/BOOT-INF/lib /backend/lib
COPY --from=build-stage ${DEPENDENCY}/META-INF /backend/META-INF
COPY --from=build-stage ${DEPENDENCY}/BOOT-INF/classes /backend

EXPOSE 8080
ENTRYPOINT ["java", "-cp", "backend:backend/lib/*", "com.codecool.Application"]