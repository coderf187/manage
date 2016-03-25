package com.manage.bean;

import java.io.Serializable;

public class User implements Serializable {

	private static final long serialVersionUID = -8073052726650029045L;

	private String token;
	
	private String user;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
	
}
