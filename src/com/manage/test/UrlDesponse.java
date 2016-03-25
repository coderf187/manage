package com.manage.test;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

/**
 * 
 * <p>Title: 对访问的接口地址进行重新封装</p>
 * <p>Description: 对访问的接口地址进行重新封装</p>
 * @version 1.0
 */
public  class UrlDesponse {
	public static final String PARTNERCODE = "0000001";        //so接入PartnerC
	public static final String KEY = "a8af6f9a1579208ed1259qab999bdb32";   //so接入key

	public static String getUrl(String url, String parm) throws Exception {
		return urlDesponse(url,parm);
	}

	public static String urlDesponse(String url, String urlParm) throws Exception{
		String src = getUnicodeSort(urlParm.split("&"));
		String str = src + "key=" + KEY;
		String sign = MD5Encode(str, "UTF-8");
		String newUrlParm = encodeParm(src);
		String redictUrl = url + "?" + newUrlParm + "&sign=" + sign;
		return redictUrl;
	}
	
	public static String getUnicodeSort(String[] args){
		String temp="";
		String [] strs = new String[args.length];
		for(int i = 0;i < args.length;i++){
			strs[i] = args[i];
		}
		Arrays.sort(strs);
		for(int i =0 ;i< strs.length;i++){
			temp+=strs[i]+"&";
		}
		return temp;
	}
	private static String encodeParm(String parm) throws Exception{
		String[] strs =  parm.split("&");
		String newParm = "";
		
		for(int i=0;i< strs.length;i++){
			char flag = strs[i].charAt(strs[i].length()-1);
			if('=' != flag){
				String newValue = URLEncoder.encode(strs[i].split("=")[1], "UTF-8");
				newParm +=strs[i].split("=")[0] + "=" + newValue +"&";
			}else{
				newParm +=strs[i].split("=")[0] + "=&";
			}
		}
		newParm += "&&";
		return newParm.replaceAll("&&&", "");
	}
	public static String MD5Encode(String src, String charset) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest md5 = null;
		md5 = MessageDigest.getInstance("MD5");
		byte[] byteArray = null;
		byteArray = src.getBytes(charset);
		byte[] md5Bytes = md5.digest(byteArray);
		StringBuffer hexValue = new StringBuffer(32);
		for (int i = 0; i < md5Bytes.length; i++) {
			int val = ((int) md5Bytes[i]) & 0xff;
			if (val < 16) {
				hexValue.append("0");
			}
			hexValue.append(Integer.toHexString(val));
		}
		return hexValue.toString();
	}

}
