package com.reactproject.shop.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reactproject.shop.web.dto.CMRespDto;
import com.reactproject.shop.web.dto.PostRequestDto;

@RestController
@RequestMapping("/api")
public class PageController {
	
	@GetMapping("/hello")
	public String hello() {
		return "hi";
	}
	
	@GetMapping("/data")
	public ResponseEntity<?> data() {
		List<Map<String, Object>> shoesArray = new ArrayList<Map<String, Object>>();
		Map<String, Object> shoesMap1 = new HashMap<String, Object>();
		Map<String, Object> shoesMap2 = new HashMap<String, Object>();
		Map<String, Object> shoesMap3 = new HashMap<String, Object>();
		
		shoesMap1.put("id", 3);
		shoesMap1.put("title", "Flowely");
		shoesMap1.put("content", "only 5 inches");
		shoesMap1.put("price", 120000);
		
		shoesMap2.put("id", 4);
		shoesMap2.put("title", "Baby shoes");
		shoesMap2.put("content", "for less than 6");
		shoesMap2.put("price", 100000);
		
		shoesMap3.put("id", 5);
		shoesMap3.put("title", "Red Herring");
		shoesMap3.put("content", "Born in France");
		shoesMap3.put("price", 90000);
		
		shoesArray.add(shoesMap1);
		shoesArray.add(shoesMap2);
		shoesArray.add(shoesMap3);
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", shoesArray));
	}

	@PostMapping("/postData")
	public ResponseEntity<?> postData(@RequestBody PostRequestDto postRequestDto) {
		System.out.println(postRequestDto);
		return ResponseEntity.ok().body(new CMRespDto<>(1, "success", postRequestDto));
	}

	@GetMapping("/name")
	public String name() {
		return "천제동";
	}
}













