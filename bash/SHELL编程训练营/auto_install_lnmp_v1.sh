#!/bin/bash
#2020年2月25日20:23:16
#auto install lnmp web
#by author www.jfedu.net
########################
#Install nginx web
yum install -y wget gzip tar make gcc
yum install -y pcre pcre-devel zlib zlib-devel
wget -c http://nginx.org/download/nginx-1.16.0.tar.gz
tar -xzf nginx-1.16.0.tar.gz
cd nginx-1.16.0
useradd -s /sbin/nologin www -M
./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_stub_status_module
make
make install
/usr/local/nginx/sbin/nginx
ps -ef|grep nginx
netstat -tnl|grep -w 80
setenforce 0
firewall-cmd --add-port=80/tcp --permanent
systemctl reload firewalld.service
iptables -t filter -A INPUT -m tcp -p tcp --dport 80 -j ACCEPT
#Install MYSQL db
yum install -y gcc-c++ ncurses-devel cmake make perl gcc autoconf
yum install -y automake zlib libxml2 libxml2-devel libgcrypt libtool bison
wget -c http://mirrors.163.com/mysql/Downloads/MySQL-5.6/mysql-5.6.45.tar.gz
tar -xzf mysql-5.6.45.tar.gz
cd mysql-5.6.45
cmake  .  -DCMAKE_INSTALL_PREFIX=/usr/local/mysql56/ \
-DMYSQL_UNIX_ADDR=/tmp/mysql.sock \
-DMYSQL_DATADIR=/data/mysql \
-DSYSCONFDIR=/etc \
-DMYSQL_USER=mysql \
-DMYSQL_TCP_PORT=3306 \
-DWITH_XTRADB_STORAGE_ENGINE=1 \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_PARTITION_STORAGE_ENGINE=1 \
-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
-DWITH_MYISAM_STORAGE_ENGINE=1 \
-DWITH_READLINE=1 \
-DENABLED_LOCAL_INFILE=1 \
-DWITH_EXTRA_CHARSETS=1 \
-DDEFAULT_CHARSET=utf8 \
-DDEFAULT_COLLATION=utf8_general_ci \
-DEXTRA_CHARSETS=all \
-DWITH_BIG_TABLES=1 \
-DWITH_DEBUG=0
make
make install
#Add MYSQL system service
cd /usr/local/mysql56/
\cp support-files/my-default.cnf /etc/my.cnf
\cp support-files/mysql.server /etc/init.d/mysqld
chkconfig --add mysqld
chkconfig --level 35 mysqld on
service  mysqld stop
mv /data/mysql/ /data/mysql.bak/
mkdir  -p  /data/mysql/
useradd  mysql
/usr/local/mysql56/scripts/mysql_install_db --user=mysql --datadir=/data/mysql/ --basedir=/usr/local/mysql56/
ln  -s  /usr/local/mysql56/bin/* /usr/bin/
service  mysqld  restart
#Install PHP FPM WEB
yum install libxml2 libxml2-devel gzip bzip2 -y
wget -c http://mirrors.sohu.com/php/php-5.6.28.tar.bz2
tar jxf  php-5.6.28.tar.bz2
cd php-5.6.28
./configure --prefix=/usr/local/php5 --with-config-file-path=/usr/local/php5/etc --with-mysql=/usr/local/mysql56/
--enable-fpm
make
make install
#Config LNMP WEB and Start Server.
cp  php.ini-development   /usr/local/php5/etc/php.ini
cp  /usr/local/php5/etc/php-fpm.conf.default  /usr/local/php5/etc/php-fpm.conf
cp sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
chmod o+x /etc/init.d/php-fpm
/etc/init.d/php-fpm start
cat>/usr/local/nginx/conf/nginx.conf <<EOF
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  \$document_root\$fastcgi_script_name;
            include        fastcgi_params;
        }
    }
}
EOF
/usr/local/nginx/sbin/nginx -s reload
