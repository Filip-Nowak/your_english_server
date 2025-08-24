FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY mvnw .
COPY pom.xml .
COPY src ./src
COPY .mvn ./.mvn


RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

ENTRYPOINT ["java", "-jar", "target/server-0.0.1-SNAPSHOT.jar"]