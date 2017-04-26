package com.sauvini.datastructure;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Scanner;

public class InfixToPostfix {
	public static void main(String[] args) {
		Deque<String> stack = new ArrayDeque<String>();
		String line = new Scanner(System.in).nextLine();
		System.out.println(line);
		Scanner scanner = new Scanner(line);
		while (scanner.hasNext()) {
			if (scanner.hasNextInt()) {
				System.out.print(scanner.nextInt() + " ");
			} else {
				String str = scanner. next();
				if ("+-*/".indexOf(str) >= 0) {
					stack.push(str);
				} else if (str.equals(")")) {
					System.out.print(stack.pop() + " ");
				}
			}
		}
		while (!stack.isEmpty()) {
			System.out.print(stack.pop() + " ");
		}
		System.out.println();
	}
}
