#!/bin/bash
#2020年2月25日20:23:16
#auto install lnmp web
#by author www.jfedu.net
#####################
#Define nginx variable
NGX_VER="1.16.0"
NGX_YUM="yum install -y"
NGX_DIR="/usr/local/nginx"
NGX_SOFT="nginx-${NGX_VER}.tar.gz"
NGX_URL="http://nginx.org/download"
NGX_SRC=$(echo $NGX_SOFT|sed 's/\.tar.gz//g')
NGX_ARGS="--user=www --group=www --with-http_stub_status_module"
#Define mysql variable
MYSQL_YUM="yum install -y"
MYSQL_SOFT="mysql-5.6.45.tar.gz"
MYSQL_DIR="/usr/local/mysql56/"
MYSQL_SRC="echo $MYSQL_SOFT|sed 's/\.tar.gz//g'"
MYSQL_URL="http://mirrors.163.com/mysql/Downloads/MySQL-5.6"
#Define php variable
PHP_YUM="yum install -y"
PHP_SOFT="php-5.6.28.tar.bz2"
PHP_DIR="/usr/local/php5/"
PHP_SRC="echo $PHP_SOFT|sed 's/\.tar.gz//g'"
PHP_URL="http://mirrors.sohu.com/php/"
function install_nginx(){
	#Install nginx web
	CHECK_NUM=$(rpm -qa|grep -wcE "gcc|pcre-devel")
	if [ $CHECK_NUM -lt 2 ];then
		$NGX_YUM wget gzip tar make gcc
		$NGX_YUM pcre pcre-devel zlib zlib-devel
	fi
	wget -c  $NGX_URL/$NGX_SOFT
	tar -xzf $NGX_SOFT
	cd $NGX_SRC 
	useradd -s /sbin/nologin www -M
	./configure --prefix=$NGX_DIR $NGX_ARGS 
	if [ $? -eq 0 ];then
		make
		make install
	fi
	$NGX_DIR/sbin/nginx
	ps -ef|grep nginx
	netstat -tnl|grep -w 80
	setenforce 0
	firewall-cmd --add-port=80/tcp --permanent
	systemctl reload firewalld.service
	iptables -t filter -A INPUT -m tcp -p tcp --dport 80 -j ACCEPT
}
function install_mysql(){
	#Install MYSQL db
	$MYSQL_YUM gcc-c++ ncurses-devel cmake make perl gcc autoconf
	$MYSQL_YUM automake zlib libxml2 libxml2-devel libgcrypt libtool bison
	wget -c  $MYSQL_URL/$MYSQL_SOFT
	tar -xzf $MYSQL_SOFT
	cd $MYSQL_SRC
	cmake  .  -DCMAKE_INSTALL_PREFIX=$MYSQL_DIR/ \
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
	cd $MYSQL_DIR/
	\cp support-files/my-default.cnf /etc/my.cnf
	\cp support-files/mysql.server /etc/init.d/mysqld
	chkconfig --add mysqld
	chkconfig --level 35 mysqld on
	service  mysqld stop
	mv /data/mysql/ /data/mysql.bak/
	mkdir  -p  /data/mysql/
	useradd  mysql
	$MYSQL_DIR/scripts/mysql_install_db --user=mysql --datadir=/data/mysql/ --basedir=$MYSQL_DIR/
	ln  -s  $MYSQL_DIR/bin/* /usr/bin/
	service  mysqld  restart
}
function install_php(){
	#Install PHP FPM WEB
	yum install libxml2 libxml2-devel gzip bzip2 -y
	wget -c $PHP_URL/$PHP_SOFT
	tar jxf  $PHP_SOFT
	cd $PHP_SRC
	./configure --prefix=$PHP_DIR --with-config-file-path=$PHP_DIR/etc --with-mysql=$MYSQL_DIR/
	--enable-fpm
	make
	make install
	#Config LNMP WEB and Start Server.
	cp  php.ini-development   $PHP_DIR/etc/php.ini
	cp  $PHP_DIR/etc/php-fpm.conf.default  $PHP_DIR/etc/php-fpm.conf
	cp sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
	chmod o+x /etc/init.d/php-fpm
	/etc/init.d/php-fpm start
}
function lnmp_config(){
cat>$NGX_DIR/conf/nginx.conf <<EOF
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
$NGX_DIR/sbin/nginx -s reload
}
case $1 in
	1 )
	install_nginx
	;;
	2 )
	install_mysql
	;;
	3 )
	install_php
	;;
	4 )
	lnmp_config
	;;
	*  )
	echo -e "\033[32m----------------\033[0m"
	echo -e "\033[32m1)Install Nginx WEB.\033[0m"
	echo -e "\033[32m2)Install MYSQL DB.\033[0m"
	echo -e "\033[32m3)Install PHP-FPM WEB.\033[0m"
	echo -e "\033[32m4)Install LNMP config.\033[0m"
	echo -e "\033[32mUsage:{/bin/sh $0 1|2|3|4|help}\033[0m"
esac
