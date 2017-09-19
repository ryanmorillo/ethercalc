FROM node:5.12

RUN useradd ethercalc --create-home

USER ethercalc
ENV HOME /home/ethercalc
HTTP_PROXY http://cproxy.ord1.corp.rackspace.net:3128
RUN npm install -g ethercalc pm2
EXPOSE 8000
CMD ["sh", "-c", "REDIS_HOST=$REDIS_PORT_6379_TCP_ADDR REDIS_PORT=$REDIS_PORT_6379_TCP_PORT HTTP_PROXY=http://cproxy.ord1.corp.rackspace.net:3128 pm2 start -x `which ethercalc` -- --cors && pm2 logs"]
