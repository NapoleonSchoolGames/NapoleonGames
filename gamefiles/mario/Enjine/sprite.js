Enjine.Sprite=function(){this.X=0,this.Y=0,this.Image=null},Enjine.Sprite.prototype=new Enjine.Drawable,Enjine.Sprite.prototype.Draw=function(i,t){i.drawImage(this.Image,this.X-t.X,this.Y-t.Y)};