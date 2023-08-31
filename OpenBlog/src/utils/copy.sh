#!/bin/sh
cd /Users/weijiezhou/Desktop/OpenBlogSite/OpenBlog/logs
cp access.log $(date +%Y-%m-%d-%H).access.log
echo "" > access.log