package com.chat.model;

public class Message {
	
	private String name;
	
	private  String  content;
	
	private  String imageUrl;

	public Message(String name, String content, String imageUrl) {
		super();
		this.name = name;
		this.content = content;
		this.imageUrl=imageUrl;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
	public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
	

}
