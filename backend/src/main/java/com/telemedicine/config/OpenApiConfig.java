package com.telemedicine.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI telemedicineOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Telemedicine Consultation & EHR System API")
                        .version("1.0")
                        .description("This API handles patients, doctors, consultations, prescriptions, and electronic health records (EHR) for a comprehensive telemedicine system."));
    }
}
