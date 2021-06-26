package com.medflixofficial.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import com.getcapacitor.community.fcm.FCMPlugin;
import com.getcapacitor.community.facebooklogin.FacebookLogin;
import com.jeep.plugin.capacitor.CapacitorVideoPlayer;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

//com.getcapacitor.community.facebooklogin.FacebookLogin.class

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{

      add(FCMPlugin.class);
      add(CapacitorVideoPlayer.class);
      add(GoogleAuth.class);
      add(FacebookLogin.class);
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});
  }

}
