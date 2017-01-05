package com.test;

import java.applet.*;
import java.awt.*;
/*
<applet code=draw1 width=400 height=400>
</applet>
*/
public class draw1 extends Applet
{
        public void init()
        {
                setBackground(Color.green);
                setForeground(Color.red);
        }
        public void paint(Graphics g)
        {     
                g.drawRect(50, 100, 200, 200);
                g.fillRect(250, 110, 10, 200);
                g.fillRect(60, 300, 200, 10);
        }
}
