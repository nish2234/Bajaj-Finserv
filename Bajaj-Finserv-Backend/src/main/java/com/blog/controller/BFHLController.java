package com.blog.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bfhl")
public class BFHLController {
	  @PostMapping
	    public Map<String, Object> processData(@RequestBody Map<String, List<String>> request) {
	        Map<String, Object> response = new HashMap<>();

	        String userId = "21BBS0048"; // Replace with dynamic value if needed
	        String email = "nishantkumar.singh2021@vitstudent.ac.in";
	        String rollNumber = "21BBS0048"; 

	        List<String> data = request.get("data");
	        List<String> numbers = new ArrayList<>();
	        List<String> alphabets = new ArrayList<>();
	        List<String> highestLowercaseAlphabet = new ArrayList<>();

	        for (String item : data) {
	            if (item.matches("[0-9]+")) {
	                numbers.add(item);
	            } else if (item.matches("[a-zA-Z]")) {
	                alphabets.add(item);
	                if (item.matches("[a-z]")) {
	                    if (highestLowercaseAlphabet.isEmpty() || item.compareTo(highestLowercaseAlphabet.get(0)) > 0) {
	                        highestLowercaseAlphabet.clear();
	                        highestLowercaseAlphabet.add(item);
	                    }
	                }
	            }
	        }

	        response.put("is_success", true);
	        response.put("user_id", userId);
	        response.put("email", email);
	        response.put("roll_number", rollNumber);
	        response.put("numbers", numbers);
	        response.put("alphabets", alphabets);
	        response.put("highest_lowercase_alphabet", highestLowercaseAlphabet);

	        return response;
	    }

	    @GetMapping
	    public Map<String, Integer> getOperationCode() {
	        Map<String, Integer> response = new HashMap<>();
	        response.put("operation_code", 1);
	        return response;
	    }
}
