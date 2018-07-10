# runplatform-webpages

> runplatform

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 配置git-->svn

``` bash
.git下config在最后面增加下面内容：

   [svn-remote "svn"]

   url = svn://192.168.1.183:3698/tool/yanphone-genplatform/branches/XXXXXXXXXX(svn地址)

   fetch = :refs/remotes/git-svn

最后同步一下svn记录   git svn fetch svn
```


## 提交svn
``` bash
git pull

git svn fetch svn

git checkout git-svn

git merge master

git svn dcommit

git checkout master
```