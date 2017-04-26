package com.sauvini.test;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Fileread {

	public static void main(String[] args) {
		 Map<String, Integer> countByWords = new HashMap<String, Integer>();
		    Scanner s = null;
			try {
				s = new Scanner(new File("D:\\readit.txt"));
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    while (s.hasNext()) {
		        String next = s.next();
		        Integer count = countByWords.get(next);
		        if (count != null) {
		            countByWords.put(next, count + 1);
		        } else {
		            countByWords.put(next, 1);
		        }
		    }
		    System.out.println(countByWords);
		    s.close();

	}

}
