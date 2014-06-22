var cache = function () {
    this.ticket = 'renren';
}

//当无法支持localStorage时将数组转为cookie处理
cache.prototype.if_not_supurt_to_do = function () {
    if (!window.localStorage) {
        window.localStorage = {
            getItem: function (sKey) {
                if (!sKey || !this.hasOwnProperty(sKey)) {
                    return null;
                }
                return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
            },
            key: function (nKeyId) {
                return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
            },
            setItem: function (sKey, sValue) {
                if (!sKey) {
                    return;
                }
                document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                this.length = document.cookie.match(/\=/g).length;
            },
            length: 0,
            removeItem: function (sKey) {
                if (!sKey || !this.hasOwnProperty(sKey)) {
                    return;
                }
                document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                this.length--;
            },
            hasOwnProperty: function (sKey) {
                return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            }
        };
        window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
    }
}
//带hash存或者取缓存
cache.prototype.value = function (key, value, expires) {
    if (window.localStorage) {
        return (value) ? dojob.cache.set(this.ticket + key, value, expires) : dojob.cache.get(this.ticket + key);
    }
}
//获取一个缓存
cache.prototype.get = function (key) {
    if (window.localStorage) {
        var json = JSON.parse(localStorage.getItem(key));
        if (json) {
            var expires = (+new Date()) - json.create_at;
            if (expires < json.expires || json.expires == 0) return json.val;
            dojob.cache.remove(key);
        }
    }
}
//设置一个缓存
cache.prototype.set = function (key, value, expires) {
    if (window.localStorage) {
        localStorage.setItem(
            key,
            JSON.stringify({
                expires: (expires) ? parseInt(expires) : 0,
                create_at: +new Date(),
                val: value
            }));
        return true;
    }
}
//删除一个缓存
cache.prototype.remove = function (key) {
    if (window.localStorage) {
        localStorage.removeItem(key);
        return true;
    }
}
//清楚所有缓存
cache.prototype.clear = function () {
    if (window.localStorage) {
        localStorage.clear();
    }
}
