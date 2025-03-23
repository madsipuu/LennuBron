
FROM openjdk:23
ARG JAR_FILE=target/Lennupiletid-0.0.1-SNAPSHOT.jar
COPY target/Lennupiletid-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]



