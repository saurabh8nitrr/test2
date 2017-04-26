package com.sauvini.shashank;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Collections;
import java.util.Scanner;


public class StringsInPlay {

	public static void main(String[] args) {
		int size = 0;
		int length;		
		int j=0 ,k=0;		
		String hero= "";
	
ArrayList<String> ls= new ArrayList<String>();

ArrayList<String> stringsInplay= new ArrayList<String>();

@SuppressWarnings("resource")
Scanner sc= new Scanner(System.in);
System.out.println("Enter the size of character array");
length =sc.nextInt();

System.out.println("Enter the characters of array");
for (k=0;k<length;k++)
{
	ls.add(String.valueOf(sc.next().charAt(0)));
	}
Collections.sort(ls);
HashSet<String> st= new HashSet<String>(ls);
ls.clear();
ls.addAll(st);
System.out.println("Enter the size of the desired strings");

size=sc.nextInt();
int count =(size-1);
int i=(size-1);

/*for (String a : ls) {
	System.out.println(a);
}*/
for(j=0;j<size ;j++)
{
hero+=ls.get(0);
		
}
stringsInplay.add(hero);
//System.out.println("i="+i+"count="+count);
//System.out.println(hero.charAt(i));
while(count>=0)
{
	
count =size-1;
i=(size-1);
	while(count>=0 &&(String.valueOf(hero.charAt(i)).equals(ls.get(ls.size()-1))))
	{
		i--;
		count =i;
		
	}
	if (count<0) break;

	if (count>=0 && count<size-1)
	{
		hero="" +hero.substring(0,count) +ls.get(ls.indexOf(String.valueOf(hero.charAt(count)))+1);
		//+hero.substring(count, size);
		j=0;
		for (j=count;j<size-1;j++)
		{
			hero=hero+ls.get(0);
		}
		stringsInplay.add(hero);
		//System.out.println(hero);
	}
	else if (count>=0)
	{
		hero="" +hero.substring(0,count) +ls.get(ls.indexOf(String.valueOf(hero.charAt(count)))+1);
		stringsInplay.add(hero);
	//	System.out.println(hero);
	}
//	System.out.println("count="+count);
}
System.out.println("Number of Patters =" + stringsInplay.size());
for (String a : stringsInplay) {
	System.out.println(a);
}

}
	
	public static String size()
	{
		return null;}
}
