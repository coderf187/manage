package com.manage.core;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author zj
 */
public class AppFilter implements Filter {

	public void init(FilterConfig paramFilterConfig) throws ServletException {}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		AppContext.initSystemEnvironmentContext((HttpServletRequest) request, (HttpServletResponse) response);
		chain.doFilter(request, response);
	}

	public void destroy() {}
}
