FROM openjdk:11
COPY target/*.jar sps.jar
ENTRYPOINT [ "java","-jar","sps.jar" ]
