package com.manage.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.manage.core.AppContext;
import com.manage.core.Constants;
/**
 * 退出系统处理器
 * @author fj
 *
 */
public class QuitServlet extends HttpServlet {


	private static final long serialVersionUID = -7963003898804192942L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		//注销原有session，创建新的session
        HttpSession session = request.getSession(false);
		if (session != null) {
            try {
                session.invalidate();
            } catch (Throwable t) {
            }
        }
		//Session线程变量更新
        AppContext.putThreadContext(Constants.THREAD_CONTEXT_SESSION_KEY, session);
        PrintWriter out = response.getWriter();
		
		out.write("true");
		
		out.flush();
		out.close();
	}
}