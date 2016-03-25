package com.manage.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.manage.Dispatcher;
/**
 * main处理器 上传文件
 * @author fj
 *
 */
public class UploadServlet extends HttpServlet {


	
	private static final long serialVersionUID = -5807083862065576431L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		//注销原有session，创建新的session
		
		String result = Dispatcher.transUpload(request,response);
//		request.getRequestDispatcher("/pubsecondhouse.html").forward(request, response);

		PrintWriter out = response.getWriter();
		out.write(result);
		
		out.flush();
		out.close();
	}
}