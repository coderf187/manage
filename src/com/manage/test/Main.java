package com.manage.test;

import org.apache.commons.lang.StringUtils;

import com.manage.core.AppContext;
import com.manage.core.Constants;
import com.manage.util.HttpClientUtil;
import com.manage.util.UrlDesponse;



public class Main {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		 HttpClientUtil httpClient = new HttpClientUtil(20000);
		try {
			String url = "";
			httpClient.open("http://211.149.156.121/manageSever/wares/addWares.action", "post");
			httpClient.addParameter("Name1", "2");
			httpClient.addParameter("Price", "2000");
			httpClient.addParameter("Type1", "0");
			httpClient.addParameter("Type2", "1");
			httpClient.addParameter("Unit", "元");
			httpClient.addParameter("description1", "2");
			httpClient.addParameter("sellerId", "1");
			httpClient.addParameter("sign", "c527010c8ecc8ce4a890e62294660f25");
			httpClient.addParameter("token", "1500000000020150928050615478");
		
			httpClient.send();
			String result = httpClient.getResponseBodyAsString("UTF-8");
			System.out.print(result);
		} catch (Exception e) {
			System.out.print("dd");
		} finally {
			httpClient.close();
		}
	}
	

}
