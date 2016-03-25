package com.manage.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.manage.Dispatcher;
import com.manage.core.AppContext;
import com.manage.core.Constants;
import com.manage.core.MD5;
/**
 * 登录处理器
 * @author zj
 *
 */
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = -1240055930439124813L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		String mobile = request.getParameter("mobile");
		String password = request.getParameter("password");
		//注销原有session，创建新的session
        HttpSession session = request.getSession(false);
		if (session != null) {
            try {
                session.invalidate();
            } catch (Throwable t) {
            }
        }
        session = request.getSession(true);
		//Session线程变量更新
        AppContext.putThreadContext(Constants.THREAD_CONTEXT_SESSION_KEY, session);
		
		String result = Dispatcher.transLogin(mobile, MD5.MD5Encode(password, "UTF-8"));

		PrintWriter out = response.getWriter();
		
		out.write(result);
		
		out.flush();
		out.close();
	}
}