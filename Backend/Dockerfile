 # Get Base Image (Full .NET Core SDK)
 FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
 WORKDIR /app

 # Copy csproj and restore
 COPY *.csproj ./
 RUN dotnet restore

 # Copy everything else and build
 COPY . ./
 RUN dotnet publish -c Release -o out

 # Generate runtime image
 FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
 WORKDIR /app
 COPY --from=build-env /app/out .
 ENTRYPOINT ["dotnet", "WebApi.dll"]

# FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
# COPY . /app
# WORKDIR /app
# RUN ["dotnet", "restore"]
# RUN ["dotnet", "build"]
# EXPOSE 80/tcp
# RUN chmod +x ./entrypoint.sh
# CMD /bin/bash ./entrypoint.sh

