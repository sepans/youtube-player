'use strict';

import $http from './AJAX';


class YoutubeUtils  {
 

  	static queryVideoInfo(youtubeId) {
  		var self = this;
    	return new Promise(function(resolve, reject) {
		    var n = 'http://lenses-cors.herokuapp.com/';
		    var url = n + 'http://www.youtube.com/get_video_info?video_id=' + youtubeId;
		    

			$http.ajaxGet(url)
		    //.then(JSON.parse)
		    .then(function(queryString) {
			  console.log('done ');
		      var decoded = self._decodeQueryString(queryString);
		      
		        decoded.sources = self._decodeStreamMap(decoded.url_encoded_fmt_stream_map);
		        decoded.webmURL = self._getSource(decoded, 'video/webm', 'hd720').url;
		        console.log('decoded ',decoded);
		        


		        resolve(decoded);
		      

		    }.bind(self))
		    .catch(function(error) { reject(error) });
		});
	}

  static _getSource(info, codec, quality) {
          var n, o, i, r, a;
          i = null,
          n = null,
          a = info.sources;
          for (o in a) {
            r = a[o];
            r.type.match(codec) && (r.quality.match(quality) ? n = r : i = r);
          }
          return n || i
   }

  static _decodeQueryString (e)  {
    var t, n, o, i, r, a, d;
    for (i = {},
      o = e.split('&'),
      a = 0,
      d = o.length; d > a; a++)
      n = o[a],
      t = decodeURIComponent(n.split('=')[0]),
      r = decodeURIComponent(n.split('=')[1] || ''),
      i[t] = r;
    return i
  }

  static _decodeStreamMap (e) {
    var t, n, o, i, r, a, d, s;
    for (n = {},
      s = e.split(','),
      a = 0,
      d = s.length; d > a; a++)
      r = s[a],
      o = this._decodeQueryString(r),
      i = o.type.split(';')[0],
      t = o.quality.split(',')[0],
      o.original_url = o.url,
      o.url = '' + o.url + '&signature=' + o.sig,
      n['' + i + ' ' + t] = o;
    return n
  }
}



export default YoutubeUtils;
