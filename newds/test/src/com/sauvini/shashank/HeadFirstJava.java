package com.sauvini.shashank;

public class HeadFirstJava extends StringsInPlay {

	public static void main(String[] args) {
	String [] first ={"home","house","planet","stars","galaxy","universe","alphacentuary","rocket"};
	String [] second ={"Neil","Ryan","shashank","Michio","Sthephen","krauss"};
	String [] third ={"superficial","immpossible","never","right","wrong","negative","false","suck"};
	
	int firstLength =first.length;
	int secondLength =second.length;
	int thirdLength =third.length;
	
	int ran1 = (int) (Math.random()*firstLength);
	int ran2 = (int) (Math.random()*secondLength);
	int ran3 = (int) Math.random()*thirdLength;
	
	System.out.println("The String Theory says "+first[ran1]+" "+second[ran2]+  " "+third[ran3]);
	System.out.println(Math.random());

	HeadFirstJava jj= new HeadFirstJava();
	jj.Size(first[ran1]);
	
	}

	String Size(String a)
	{
		StringsInPlay.size();
		//StringsInPlay.main(String ar[]);
		StringsInPlay.size().endsWith("sau");
		return a;
		
		
	}
}
