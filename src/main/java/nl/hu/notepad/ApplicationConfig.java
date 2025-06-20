// regelt het startpunt van de api
package nl.hu.notepad;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/")
public class ApplicationConfig extends Application {
}
