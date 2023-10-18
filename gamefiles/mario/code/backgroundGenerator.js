Mario.BackgroundGenerator=function(t,e,i,r){this.Width=t,this.Height=e,this.Distant=i,this.Type=r},Mario.BackgroundGenerator.prototype={SetValues:function(t,e,i,r){this.Width=t,this.Height=e,this.Distant=i,this.Type=r},CreateLevel:function(){var t=new Mario.Level(this.Width,this.Height);switch(this.Type){case Mario.LevelType.Overground:this.GenerateOverground(t);break;case Mario.LevelType.Underground:this.GenerateUnderground(t);break;case Mario.LevelType.Castle:this.GenerateCastle(t)}return t},GenerateOverground:function(t){for(var e,i,r=this.Distant?4:6,h=this.Distant?2:1,o=(Math.floor(Math.random()*r),0),a=Math.floor(Math.random()*r)+h,s=0,n=0,d=2,s=0;s<this.Width;s++){for(o=a;o===a;)a=Math.floor(Math.random()*r)+h;for(n=0;n<this.Height;n++)i=o<a?a:o,d=2,n<(e=o<a?o:a)?this.Distant?(n<(d=2)&&(d=n),t.SetBlock(s,n,4+8*d)):t.SetBlock(s,n,5):n===e?(d=e===a?0:1,d+=this.Distant?2:0,t.SetBlock(s,n,d)):n===i?(d=e===a?0:1,d+=this.Distant?2:0,t.SetBlock(s,n,d+16)):(d=i<n?1:0,e===o&&(d=1-d),d+=this.Distant?2:0,t.SetBlock(s,n,d+8))}},GenerateUnderground:function(t){var e=0,i=0,r=0,h=0;if(this.Distant)for(var o=0,e=0;e<this.Width;e++)for(Math.random()<.75&&(o=1-o),i=0;i<this.Height;i++)r=o,((h=i-2)<0||4<h)&&(h=2,r=0),t.SetBlock(e,i,4+r+8*(3+h));else for(e=0;e<this.Width;e++)for(i=0;i<this.Height;i++)r=e%2,((h=i-1)<0||7<h)&&(h=7,r=0),0===r&&1<h&&h<5&&(r=-1,h=0),t.SetBlock(e,i,6+r+8*h)},GenerateCastle:function(t){var e=0,i=0,r=0,h=0;if(this.Distant)for(e=0;e<this.Width;e++)for(i=0;i<this.Height;i++)r=e%2,2<(h=i-1)&&h<5?h=2:5<=h&&(h-=2),h<0?(r=0,h=5):4<h?(r=1,h=5):r<1&&3===h?(r=0,h=3):r<1&&0<h&&h<3&&(r=0,h=2),t.SetBlock(e,i,1+r+8*(h+4));else for(e=0;e<this.Width;e++)for(i=0;i<this.Height;i++)r=e%3,2<(h=i-1)&&h<5?h=2:5<=h&&(h-=2),h<0?(r=1,h=5):4<h?(r=2,h=5):r<2&&4===h?(r=2,h=4):r<2&&0<h&&h<4&&(r=4,h=-3),t.SetBlock(e,i,1+r+8*(h+3))}};