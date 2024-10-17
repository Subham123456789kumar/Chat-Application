package com.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class Config implements WebSocketMessageBrokerConfigurer {

	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {

		registry.addEndpoint("/server1").withSockJS();
	
	}
	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {

	
		registry.enableSimpleBroker("/topic");
		registry.setApplicationDestinationPrefixes("/app");
		// Increase the maximum message size limit (in bytes)
      //  registry).setMaxMessageSize(1024 * 100); // 100 KB
        
	}
	
	
}
