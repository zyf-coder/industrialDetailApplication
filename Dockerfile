FROM 192.168.209.113/library/nginx:alpine

#把当前打包工程的html复制到虚拟地址
COPY dist/ /usr/share/nginx/html/

ADD default.conf /etc/nginx/conf.d/