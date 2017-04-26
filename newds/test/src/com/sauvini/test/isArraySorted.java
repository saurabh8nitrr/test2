package com.sauvini.test;

//import java.util.Scanner;

public class isArraySorted {
	public int isArrayInSortedOrder(int[] A, int index){
		if(index==1)
			return 1;
		else
			return (A[index-1] < A[index-2])?0:isArrayInSortedOrder(A,index-1);

	}
	public static void main(String args[]){
		isArraySorted a = new isArraySorted();
		int ar[]= {1,2,3,4,5};
		a.isArrayInSortedOrder(ar, 4);
	}
}
