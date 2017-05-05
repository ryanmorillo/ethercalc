FROM node:latest

RUN useradd ethercalc --create-home

USER ethercalc
ENV HOME /home/ethercalc
RUN npm install -g ethercalc pm2
EXPOSE 8000
CMD ["sh", "-c", "REDIS_HOST=$REDIS_PORT_6379_TCP_ADDR REDIS_PORT=$REDIS_PORT_6379_TCP_PORT pm2 start -x `which ethercalc` -- --cors && pm2 logs"]
