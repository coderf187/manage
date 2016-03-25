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
 * 命令处理器
 * @author zj
 *
 */
public class CMDServlet extends HttpServlet {

	private static final long serialVersionUID = -4867355528908008630L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		String action = request.getParameter("action");
		
		String method = request.getParameter("method");
		String params = request.getParameter("params");
		
		String resultJSON = Dispatcher.dispatch(action, params, method);
		/*if(resultJSON!=null){
			resultJSON = resultJSON.replaceAll("\":null","\":\"\"");
		}*/
		PrintWriter out = response.getWriter();
		
		out.write(StringUtils.defaultIfEmpty(resultJSON, "{}"));
		
		out.flush();
		out.close();
	}

}
