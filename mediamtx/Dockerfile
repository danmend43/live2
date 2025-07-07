FROM debian:stable-slim

WORKDIR /app

RUN apt-get update && apt-get install -y wget

RUN wget https://github.com/bluenviron/mediamtx/releases/latest/download/mediamtx_linux_amd64.tar.gz \
    && tar -xzf mediamtx_linux_amd64.tar.gz \
    && mv mediamtx /app/mediamtx \
    && rm mediamtx_linux_amd64.tar.gz

COPY mediamtx.yml /app/mediamtx.yml

EXPOSE 1935 8888 8889 8890

CMD ["./mediamtx", "mediamtx.yml"] 