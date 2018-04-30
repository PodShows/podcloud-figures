FROM python

RUN pip install --no-cache-dir cassandra-migrate

CMD [ "cassandra-migrate" ] 