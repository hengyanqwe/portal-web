FROM git.ec.sgcc.com.cn:8443/library/nginx:1.23.1-alpine
RUN rm -f /etc/nginx/nginx.conf \
    && rm -f /etc/nginx/conf.d/* \
    && rm -f /usr/share/nginx/html/*
ADD ./dist/ /usr/share/nginx/html/

# 模版文件
COPY nginx_conf.template /etc/nginx/

# 根据模版文件生成配置文件
CMD envsubst '$BACKEND_ADDR' < /etc/nginx/nginx_conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
