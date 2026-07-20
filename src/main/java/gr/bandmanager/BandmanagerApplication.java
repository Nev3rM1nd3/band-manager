package gr.bandmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BandmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BandmanagerApplication.class, args);
	}

}
