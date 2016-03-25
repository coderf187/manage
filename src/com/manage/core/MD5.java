package com.manage.core;

import java.security.MessageDigest;

public class MD5 {
	public static String MD5Encode(String src, String charset) {
		MessageDigest md5 = null;
		StringBuffer hexValue = new StringBuffer(32);
		try {
			md5 = MessageDigest.getInstance("MD5");
			byte[] byteArray = null;
			byteArray = src.getBytes(charset);
			byte[] md5Bytes = md5.digest(byteArray);
			for (int i = 0; i < md5Bytes.length; i++) {
				int val = ((int) md5Bytes[i]) & 0xff;
				if (val < 16) {
					hexValue.append("0");
				}
				hexValue.append(Integer.toHexString(val));
			}
		}catch (Exception e) {
			return null;
		}
		return hexValue.toString();
	}
}
