package com.manage.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.httpclient.Cookie;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;
import org.apache.commons.httpclient.params.HttpMethodParams;

public class HttpClientUtil {
	
	private HttpClient client = null;
	private HttpMethodBase httpMethod = null;
	
	public HttpClientUtil(){
		client = new HttpClient();
		client.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");
	}
	
	/**
	 * 
	 * @param timeoutInMilliseconds 超时时间，单位毫秒
	 */
	public HttpClientUtil(int timeoutInMilliseconds){
		this();
		HttpConnectionManagerParams ps = client.getHttpConnectionManager().getParams();
		
		ps.setSoTimeout(timeoutInMilliseconds);
		ps.setConnectionTimeout(timeoutInMilliseconds);
	}
	
	/**
	 * 向指定地址发送一个HTTP请求
	 * 
	 * @param url
	 * @param method 方式 : get post
	 */
	public void open(String url, String method) {
		if("get".equalsIgnoreCase(method)){
			httpMethod = new GetMethod(url);
		}
		else if("post".equalsIgnoreCase(method)){
			httpMethod = new PostMethod(url);
		}
		else{
			throw new IllegalArgumentException("Unsupport method : " + method);
		}
	}
	
	/**
	 * 向post方法传文件参数
	 * 
	 * @param file
	 * @throws FileNotFoundException 
	 */
	public void setRequestEntity(File file) throws FileNotFoundException{
		 Part[] parts = { new FilePart("file", file) };
		 ((PostMethod)httpMethod).setRequestEntity(new MultipartRequestEntity(parts,
				 httpMethod.getParams()));
	}
	
	
	/**
	 * 在open方法之后、send()之前设置
	 * 
	 * @param name
	 * @param value
	 */
	public void setRequestHeader(String name, String value){
		httpMethod.setRequestHeader(name, value);
	}
	
	/**
	 * 添加参数
	 * 
	 * @param name
	 * @param value
	 * @throws IllegalArgumentException
	 */
	public void addParameter(String name, Object value) throws IllegalArgumentException{
        if ((name == null) || (value == null)) {
            throw new IllegalArgumentException(
                "Arguments to addParameter(String, String) cannot be null");
        }
            
		if(httpMethod instanceof GetMethod){
			String q = httpMethod.getQueryString();
			if(q == null){
				httpMethod.setQueryString(name + "=" + value);
			}
			else{
				httpMethod.setQueryString(q + "&" + name + "=" + value);
			}
		}
		else if(httpMethod instanceof PostMethod){
			((PostMethod)httpMethod).addParameter(name, String.valueOf(value));
		}
	}
	
	/**
	 * 发送Get请求
	 * 
	 * @return 请求状态 200-正常，404-页面不存在，403-禁止访问，500-服务器错误等等
	 * @throws IOException
	 */
	public int send() throws IOException{
		httpMethod.setRequestHeader("Connection", "close");
		
		return client.executeMethod(httpMethod);
	}
	
	/**
	 * 获取response header
	 * 
	 * @return
	 */
	public Map<String, String> getResponseHeader(){
		Map<String, String> r = new HashMap<String, String>();
		Header[] h = httpMethod.getResponseHeaders();
		for (Header header : h) {
			r.put(header.getName(), header.getValue());
		}
		
		return r;
	}
	
	/**
	 * 获取Cookie
	 * 
	 * @return
	 */
	public Map<String, String> getCookies(){
		Map<String, String> r = new HashMap<String, String>();
        Cookie[] cs = client.getState().getCookies();
        for (Cookie c : cs) {
			r.put(c.getName(), c.getValue());
		}
        
        return r;
	}
	
	/**
	 * Returns the response body of the HTTP method
	 * 
	 * @return
	 * @throws IOException
	 */
	public InputStream getResponseBodyAsStream() throws IOException{
		return httpMethod.getResponseBodyAsStream();
	}
	
	/**
	 * 获取网页内容
	 * 
	 * @param contentCharset
	 * @return
	 * @throws IOException
	 */
	public String getResponseBodyAsString(String contentCharset) throws IOException{
		InputStream instream = httpMethod.getResponseBodyAsStream();
        ByteArrayOutputStream outstream = new ByteArrayOutputStream(4096);
        byte[] buffer = new byte[4096];
        int len;
        while ((len = instream.read(buffer)) > 0) {
            outstream.write(buffer, 0, len);
        }
        outstream.close();
        
        byte[] rawdata = outstream.toByteArray();
        
    	if(contentCharset != null){
    		return new String(rawdata, contentCharset);
    	}
    	else{
    		return new String(rawdata);
    	}
	}
	
	/**
	 * Releases the connection being used by this HTTP method.<br>
	 * 释放连接，千万不要忘记。
	 */
	public void close(){
		if(httpMethod != null){
			try {
				httpMethod.releaseConnection();
			}
			catch (Exception e) {
			}
		}
	}
	public static String getContent(String url){
		HttpClient client = new HttpClient();
		GetMethod get = new GetMethod(url);

		get.setRequestHeader("Connection", "close");

		try {
			client.executeMethod(get);
			return get.getResponseBodyAsString();
		} catch (Exception e) {
		} finally {
			get.releaseConnection();
		}
		
		return null;
	}
}
