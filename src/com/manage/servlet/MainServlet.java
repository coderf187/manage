package com.manage.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import com.manage.Dispatcher;
/**
 * main处理器 获取用户信息
 * @author zj
 *
 */
public class MainServlet extends HttpServlet {


	private static final long serialVersionUID = -2488225367624882012L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		String result = Dispatcher.transUser();
		if(result != null ){
			result = result.replaceAll("\":null","\":\"\"");
		}else{
			result = "false";
		}
		PrintWriter out = response.getWriter();
		
		out.write(StringUtils.defaultString(result));
		
		out.flush();
		out.close();
	}
}