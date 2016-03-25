package com.manage.core;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AppContext {
	
    private static final ThreadLocal<Map<String, Object>>                   threadContext            = new ThreadLocal<Map<String, Object>>();
	
	public static Object getThreadContext(String ctxKey) {
		Map<String, Object> ctxMap = threadContext.get();
        if (ctxMap == null)
            return null;
        else
            return ctxMap.get(ctxKey);
    }
	public static void putThreadContext(String ctxKey, Object ctxValue) {
		Map<String, Object> ctxMap = threadContext.get();
        if (ctxMap == null) {
            ctxMap = new HashMap<String, Object>();
            threadContext.set(ctxMap);
        }
        ctxMap.put(ctxKey, ctxValue);
    }
	/**
     * @param request Servlet请求对象
     * @param response Servlet应答对象
     */
    public static void initSystemEnvironmentContext(HttpServletRequest request, HttpServletResponse response) {
        initSystemEnvironmentContext(request, response, true);
    }

    /**
     * @param request Servlet请求对象
     * @param response Servlet应答对象
     * @param session 是否session不存在则创建,request.getSession(true or false)
     */
    public static void initSystemEnvironmentContext(HttpServletRequest request, HttpServletResponse response, boolean session) {
        HttpSession httpSession = request.getSession(session);
        AppContext.putThreadContext(Constants.THREAD_CONTEXT_SESSION_KEY, httpSession);
        AppContext.putThreadContext(Constants.THREAD_CONTEXT_REQUEST_KEY, request);
        AppContext.putThreadContext(Constants.THREAD_CONTEXT_RESPONSE_KEY, response);
    }
    
    public static HttpSession getRawSession() {
        return (HttpSession) getThreadContext(Constants.THREAD_CONTEXT_SESSION_KEY);
    }
    
    public static HttpServletRequest getRawRequest() {
        return (HttpServletRequest) getThreadContext(Constants.THREAD_CONTEXT_REQUEST_KEY);
    }

    /**
     * 获取原始HttpServletResponse对象，不建议应用直接使用
     * @return HttpServletResponse实例
     */
    public static HttpServletResponse getRawResponse() {
        return (HttpServletResponse) getThreadContext(Constants.THREAD_CONTEXT_RESPONSE_KEY);
    }

    
    public static void putRequestContext(String ctxKey, Object ctxValue) throws IllegalAccessException {
        HttpServletRequest request = getRawRequest();
        if (request != null)
            request.setAttribute(ctxKey, ctxValue);
        else
            throw new IllegalAccessException("Request isnot in current thread context.");
    }

    public static void putSessionContext(String ctxKey, Object ctxValue) throws IllegalAccessException {
    	HttpSession session = getRawSession();
        if (session != null)
        	session.setAttribute(ctxKey, ctxValue);
        else
            throw new IllegalAccessException("Request isnot in current thread context.");
    }
    
    /**
     * 获取request级上下文参数
     * @param ctxKey 上下文键
     * @return 上下文值
     * @throws IllegalAccessException 
     */
    public static Object getRequestContext(String ctxKey) throws IllegalAccessException {
        HttpServletRequest request = getRawRequest();
        if (request != null)
            return request.getAttribute(ctxKey);
        else
            throw new IllegalAccessException("Request isnot in current thread context.");
    }
    /**
     * 获取request级上下文参数
     * @param ctxKey 上下文键
     * @return 上下文值
     * @throws IllegalAccessException 
     */
    public static Object getSessionContext(String ctxKey) throws IllegalAccessException {
    	HttpSession session = getRawSession();
        if (session != null)
            return session.getAttribute(ctxKey);
        else
            throw new IllegalAccessException("Request isnot in current thread context.");
    }
}
