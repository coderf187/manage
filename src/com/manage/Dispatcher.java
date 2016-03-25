package com.manage;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.manage.core.AppContext;
import com.manage.core.Constants;
import com.manage.core.MD5;
import com.manage.util.HttpClientUtil;
import com.manage.util.ImgCompressUtils;
import com.manage.util.UrlDesponse;

public class Dispatcher {
	private static String BASE_URL = "http://211.149.156.121/manageSever";

	private static String UPLOAD_URL = "http://211.149.156.121:80/picSever/upLoadPic.upPic";

	private static final String LOGIN_ACTION = "/user/login.action";

	private static final String USER_ACTION = "/user/queryUserByMobile.action";

	private static HttpClientUtil httpClient = new HttpClientUtil(20000);

	public static String dispatch(String action, String params, String method) {
		String result = null;
		if (StringUtils.isNotEmpty(action)) {
			JSONObject paramsMap = JSON.parseObject(params);
			try {
				String url = "";
				if ("post".equalsIgnoreCase(method)) {
					url = BASE_URL + action;
					httpClient.open(url, method);
					StringBuffer parameter = new StringBuffer();
					for (String key : paramsMap.keySet()) {
						httpClient.addParameter(key, StringUtils.defaultString(paramsMap.getString(key)));
						Object v = paramsMap.get(key);
						parameter.append(key).append("=").append(v == null ? "" : v).append("&");
					}
					// TOKEN注入
					Object token = AppContext
							.getSessionContext(Constants.SESSION_CONTEXT_TOKEN_KEY);
					if (token != null) {
						httpClient.addParameter("token", String.valueOf(token));
						parameter.append("token").append("=")
								.append(String.valueOf(token));
					}
					String src = UrlDesponse.getUnicodeSort(parameter
							.toString().split("&"));
					String str = src + "key=" + UrlDesponse.KEY;
					String sign = UrlDesponse.MD5Encode(str, "UTF-8");
					httpClient.addParameter("sign", sign);
				} else {
					url = getEncodedUrl(action, paramsMap);
					httpClient.open(url, method);
				}
				httpClient.send();
				result = httpClient.getResponseBodyAsString("UTF-8");
			} catch (Exception e) {
				return "fasle";
			} finally {
				httpClient.close();
			}
		}
		return result;
	}

	public static String transRegister(String action, String params,
			String method) {
		String result = null;
		if (StringUtils.isNotEmpty(action)) {
			JSONObject paramsMap = JSON.parseObject(params);
			try {
				String url = "";
				url = BASE_URL + action;
				httpClient.open(url, method);
				for (String key : paramsMap.keySet()) {
					String value = StringUtils.defaultString(paramsMap.getString(key));
					if(key.equals("password")){
						value = MD5.MD5Encode(value, "UTF-8");
					}
					httpClient.addParameter(key, value);
				}
				httpClient.send();
				result = httpClient.getResponseBodyAsString("UTF-8");
			} catch (Exception e) {
			} finally {
				httpClient.close();
			}
		}
		return result;
	}

	public static String transLogin(String mobile, String password) {
		Map<String, Object> params = new HashMap<String, Object>();
		String resultStr = null;

		params.put("mobile", mobile);
		params.put("password", password);
		try {
			String url = getEncodedUrl(LOGIN_ACTION, params);
			httpClient.open(url, "get");
			httpClient.send();

			resultStr = httpClient.getResponseBodyAsString("UTF-8");
			JSONObject result = JSON.parseObject(resultStr);
			String token = result.getString("token");

			if (StringUtils.isNotEmpty(token)) {
				AppContext.putSessionContext(
						Constants.SESSION_CONTEXT_TOKEN_KEY, token);
				AppContext.putSessionContext(
						Constants.SESSION_CONTEXT_MOBILE_KEY, mobile);
			}
		} catch (Exception e) {
		} finally {
			httpClient.close();
		}
		return resultStr;
	}

	public static String transUser() {
		Map<String, Object> params = new HashMap<String, Object>();
		String resultStr = null;
		Object mobileObj = null;
		try {
			mobileObj = AppContext
					.getSessionContext(Constants.SESSION_CONTEXT_MOBILE_KEY);
		} catch (IllegalAccessException e1) {
		}
		if (mobileObj == null) {
			return resultStr;
		}
		params.put("mobile", String.valueOf(mobileObj));

		try {
			String url = getEncodedUrl(USER_ACTION, params);
			httpClient.open(url, "get");
			httpClient.send();
			resultStr = httpClient.getResponseBodyAsString("UTF-8");
		} catch (Exception e) {
		} finally {
			httpClient.close();
		}
		return resultStr;
	}

	public static String transUpload(HttpServletRequest request,
			HttpServletResponse response) {
		StringBuffer resultStr = new StringBuffer();
		try {
			// 判断是否是上传表单是否为multipart/form-data类型
			if (ServletFileUpload.isMultipartContent(request)) {

				// 创建 DiskFileItemFactory工厂 对象
				DiskFileItemFactory diskFileItemFactory = new DiskFileItemFactory();
				// 创建DiskFileItemFactory的解析器对象
				ServletFileUpload fileUpload = new ServletFileUpload(
						diskFileItemFactory);
				// 设置上传头的编码格式
				fileUpload.setHeaderEncoding("UTF-8");

				// 解析request请求
				List<FileItem> fileItems = fileUpload.parseRequest(request);
				// fileItem 对应<input type="file" name="upload" id="upfile" />
				// fileItem <input type="text" name="user" />
				// 遍历操作
				for (FileItem fileItem : fileItems) {
					// 首先判断 是否是 普通的文本
					if (fileItem.isFormField()) {
						continue;
					} else {
						httpClient.open(UPLOAD_URL, "post");
						StringBuffer parameter = new StringBuffer();
						// TOKEN注入
						Object token = AppContext
								.getSessionContext(Constants.SESSION_CONTEXT_TOKEN_KEY);
						if (token != null) {
							httpClient.addParameter("token",
									String.valueOf(token));
							parameter.append("token").append("=")
									.append(String.valueOf(token));
						}
						String src = UrlDesponse.getUnicodeSort(parameter
								.toString().split("&"));
						String str = src + "key=" + UrlDesponse.KEY;
						String sign = UrlDesponse.MD5Encode(str, "UTF-8");
						httpClient.addParameter("sign", sign);
						// 获取上传文件的名称 文件名称可能是(c:\xxxx\xxx\xx.jpg(IE浏览器)
						String fileName = fileItem.getName();
						if (fileItem.getContentType().equals("image/jpeg")) {
							int suffixIndex = fileName.lastIndexOf(".");
							if (!fileName.substring(suffixIndex + 1).equals(
									"jpg")
									&& !fileName.substring(suffixIndex + 1)
											.equals("jpeg")
									&& !fileName.substring(suffixIndex + 1)
											.equals("png")) {
								fileName = fileName + ".jpg";
							}
						}
						// 如果在IE浏览器中 ---> 先解析出xx.jpg
						int index = fileName.lastIndexOf("\\");
						// 进行判断是否 含有\
						if (index != -1) {
							// 含有\ 就解析出xx.jpg
							fileName = fileName.substring(index + 1);
						}
						// 添加时间戳 保证上传的文件名称唯一
						fileName = System.currentTimeMillis() + "_" + fileName;
						// 设置保存的路径 防止外部直接访问 存放在WEB-INF目录下
						String path = request.getServletContext().getRealPath(
								"/upload");
						File fPath = new File(path);
						if (!fPath.exists()) {
							fPath.mkdirs();
						}
						// 创建保存的文件
						File file = new File(path, fileName);
						// 获取请求的输入流对象
						InputStream is = fileItem.getInputStream();
						// 输出流对象
						FileOutputStream fos = new FileOutputStream(file);
						// 缓冲区大小
						byte[] buffer = new byte[1024];
						// 读取的长度
						int len = 0;
						// 读取 如果读取的结果为-1 证明读取完毕,否则继续读取
						while ((len = is.read(buffer)) != -1) {
							// 写入文件
							fos.write(buffer, 0, len);
						}
						// 关闭流的操作
						fos.close();
						is.close();
						// 通过以下方法可以模拟页面参数提交
						// filePost.setParameter("name", "中文");
						// filePost.setParameter("pass", "1234");
						if((double)file.length()/(1024*1024) > 0.5){
							String resizePath = file.getCanonicalPath().replace(file.getName(), "new_" + file.getName());
							ImgCompressUtils.resizeFix(file.getCanonicalPath(), resizePath, 500, 700);
							file = new File(resizePath);
						}
						httpClient.setRequestEntity(file);
						httpClient.send();
						String result = httpClient
								.getResponseBodyAsString("UTF-8");
						resultStr.append(result).append(",");
						// 删除临时文件
						fileItem.delete();
					}
				}
				if (resultStr.length() > 0) {
					resultStr.deleteCharAt(resultStr.length() - 1);
				}
			}
		} catch (Exception e) {
			System.out.print(e.getMessage());
			return "false";
		} finally {
			httpClient.close();
		}
		return "[" + resultStr.toString() + "]";
	}

	private static String getEncodedUrl(String action,
			Map<String, Object> paramsMap) throws Exception {
		StringBuffer parameter = new StringBuffer();
		if (paramsMap != null) {
			for (String key : paramsMap.keySet()) {
				Object v = paramsMap.get(key);
				parameter.append(key).append("=").append(v == null ? "" : v)
						.append("&");
			}
			// TOKEN注入
			Object token = AppContext.getSessionContext(Constants.SESSION_CONTEXT_TOKEN_KEY);
			if (token != null) {
				parameter.append("token").append("=")
						.append(String.valueOf(token));
			}
		}
		return UrlDesponse.getUrl(BASE_URL + action, parameter.toString());
	}
}
