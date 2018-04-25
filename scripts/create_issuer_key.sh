#!/bin/sh
echo Issuer name ? && \

read -r issuer && \

ssh-keygen -t rsa -b 4096 -f issuers_keys/$issuer.key -q -N "" && \

openssl rsa \
    -in issuers_keys/$issuer.key \
    -pubout -outform PEM \
    -out issuers_keys/$issuer.pub && \

rm issuers_keys/$issuer.key.pub && \

echo created issuers_keys/$issuer.pub and issuers_keys/$issuer.key